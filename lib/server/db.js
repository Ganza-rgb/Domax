import fs from 'node:fs'
import path from 'node:path'

/*
 * The portal's store: one SQLite file on this machine (data/domax.db), using
 * the database built into Node, so there is nothing to install and nothing
 * leaves the computer. Moving to hosting in Rwanda means pointing this module
 * at that server's database; every route goes through here.
 *
 * node:sqlite is loaded with process.getBuiltinModule so the bundler never
 * tries to resolve it.
 */
const SCHEMA = `
CREATE TABLE IF NOT EXISTS classes (
  code TEXT PRIMARY KEY,
  teacher_id TEXT NOT NULL,
  class_id TEXT NOT NULL,
  name TEXT NOT NULL,
  level TEXT,
  under16 INTEGER NOT NULL DEFAULT 0,
  consent_ok INTEGER NOT NULL DEFAULT 0,
  settings TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (teacher_id, class_id)
);
CREATE TABLE IF NOT EXISTS students (
  code TEXT NOT NULL,
  student_id TEXT NOT NULL,
  name TEXT NOT NULL,
  ids TEXT NOT NULL DEFAULT '{}',
  email TEXT,
  phone TEXT,
  PRIMARY KEY (code, student_id)
);
CREATE TABLE IF NOT EXISTS papers (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  kind TEXT NOT NULL,
  filename TEXT NOT NULL,
  mime TEXT NOT NULL,
  size INTEGER NOT NULL,
  allow_download INTEGER NOT NULL DEFAULT 1,
  data BLOB NOT NULL,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS results (
  code TEXT NOT NULL,
  exam_id TEXT NOT NULL,
  student_id TEXT NOT NULL,
  exam_title TEXT NOT NULL,
  total REAL NOT NULL,
  max REAL NOT NULL,
  items TEXT NOT NULL DEFAULT '[]',
  advice TEXT NOT NULL DEFAULT '{}',
  released_at TEXT NOT NULL,
  PRIMARY KEY (code, exam_id, student_id)
);
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  student_id TEXT,
  direction TEXT NOT NULL,
  subject TEXT,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL,
  read_at TEXT
);
CREATE TABLE IF NOT EXISTS attempts (
  key TEXT NOT NULL,
  at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_papers_code ON papers (code);
CREATE INDEX IF NOT EXISTS idx_messages_code ON messages (code);
CREATE INDEX IF NOT EXISTS idx_attempts_key ON attempts (key, at);
`

export const dataDir = () => process.env.DOMAX_DATA_DIR || path.join(process.cwd(), 'data')

const globalForDb = globalThis
export function getDb() {
  if (globalForDb.__domaxDb) return globalForDb.__domaxDb
  const { DatabaseSync } = process.getBuiltinModule('node:sqlite')
  fs.mkdirSync(dataDir(), { recursive: true })
  const db = new DatabaseSync(path.join(dataDir(), 'domax.db'))
  db.exec('PRAGMA journal_mode = WAL')
  db.exec(SCHEMA)
  globalForDb.__domaxDb = db
  return db
}

export const nowIso = () => new Date().toISOString()
