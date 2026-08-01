import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/prisma';
import type { RegisterAdminInput, LoginInput } from '@repo/types';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function registerAdmin(input: RegisterAdminInput) {
  // Cek slug tenant belum dipakai
  const existingTenant = await prisma.tenant.findUnique({
    where: { slug: input.tenantSlug },
  });
  if (existingTenant) {
    throw new Error('Slug undangan sudah digunakan, silakan pilih yang lain');
  }

  // Cek email belum terdaftar
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: input.email },
  });
  if (existingAdmin) {
    throw new Error('Email sudah terdaftar');
  }

  const passwordHash = await bcrypt.hash(input.password, 10);

  // Buat tenant + admin sekaligus dalam satu transaksi
  const tenant = await prisma.tenant.create({
    data: {
      slug: input.tenantSlug,
      adminUsers: {
        create: {
          name: input.name,
          email: input.email,
          passwordHash,
        },
      },
    },
    include: { adminUsers: true },
  });

  const admin = tenant.adminUsers[0];
  const token = generateToken(admin.id, tenant.id);

  return {
    token,
    admin: { id: admin.id, name: admin.name, email: admin.email },
    tenant: { id: tenant.id, slug: tenant.slug },
  };
}

export async function loginAdmin(input: LoginInput) {
  const admin = await prisma.adminUser.findUnique({
    where: { email: input.email },
    include: { tenant: true },
  });
  if (!admin) {
    throw new Error('Email atau password salah');
  }

  const isPasswordValid = await bcrypt.compare(input.password, admin.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Email atau password salah');
  }

  const token = generateToken(admin.id, admin.tenantId);

  return {
    token,
    admin: { id: admin.id, name: admin.name, email: admin.email },
    tenant: { id: admin.tenant.id, slug: admin.tenant.slug },
  };
}

function generateToken(adminId: string, tenantId: string) {
  return jwt.sign({ adminId, tenantId }, JWT_SECRET, { expiresIn: '7d' });
}
