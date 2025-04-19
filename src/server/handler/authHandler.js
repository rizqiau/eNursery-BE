const bcrypt = require("bcryptjs");
const users = require("../models/userModel");
const { generateToken } = require("../utils/jwtHelper");

// Register user baru
exports.register = async (req, res) => {
  const { name, email, password, role, wilayah, fotoUri } = req.body;

  // Validasi basic
  if (!email || !password || !name || !role || !wilayah) {
    return res.status(400).json({
      message: "Semua field wajib diisi (kecuali fotoUri boleh kosong)",
    });
  }

  // Cek email sudah terdaftar?
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email sudah terdaftar" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    role,
    wilayah,
    fotoUri: fotoUri || null, // kalau fotoUri tidak ada, isi null
  };
  users.push(newUser);

  res.status(201).json({
    message: "Register berhasil",
    data: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      wilayah: newUser.wilayah,
      fotoUri: newUser.fotoUri,
    },
  });
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validasi basic
  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi" });
  }

  // Cari user
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ message: "Email tidak ditemukan" });
  }

  // Cek password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ message: "Password salah" });
  }

  // Buat JWT token
  const token = generateToken({ id: user.id, email: user.email });

  res.json({ message: "Login berhasil", token });
};
