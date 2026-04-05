CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id          UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255)    NOT NULL,
    email       VARCHAR(255)    UNIQUE NOT NULL,
    password    VARCHAR(255)    NOT NULL,
    role        VARCHAR(50)     NOT NULL CHECK (role IN ('student', 'admin')),
    created_at  TIMESTAMPTZ     DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS groups (
    id          UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255)    NOT NULL,
    owner_id    UUID            NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
    created_at  TIMESTAMPTZ     DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS group_members (
    group_id    UUID            NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    user_id     UUID            NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at   TIMESTAMPTZ     DEFAULT NOW(),
    PRIMARY KEY (group_id, user_id)
);

CREATE TABLE IF NOT EXISTS assignments (
    id          UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(255)    NOT NULL,
    description TEXT,
    due_date    TIMESTAMPTZ     NOT NULL,
    drive_link  VARCHAR(500),
    created_by  UUID            REFERENCES users(id) ON DELETE SET NULL,
    assigned_to VARCHAR(10)     DEFAULT 'all' CHECK (assigned_to IN ('all', 'specific')),
    created_at  TIMESTAMPTZ     DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assignment_groups (
    assignment_id   UUID            NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    group_id        UUID            NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    PRIMARY KEY (assignment_id, group_id)
);

CREATE TABLE IF NOT EXISTS submissions (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id   UUID            NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    group_id        UUID            NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    confirmed_by    UUID            REFERENCES users(id) ON DELETE SET NULL,
    confirmed_at    TIMESTAMPTZ,
    UNIQUE (assignment_id, group_id)
);