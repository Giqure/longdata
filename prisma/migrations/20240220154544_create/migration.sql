-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `createAt` VARCHAR(191) NOT NULL DEFAULT '',
    `updatedAt` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `liveuser` (
    `id` INTEGER NOT NULL,
    `sourceIp` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `path` VARCHAR(191) NOT NULL,
    `uploadAt` VARCHAR(191) NOT NULL,
    `updatedAt` VARCHAR(191) NOT NULL DEFAULT '',
    `uploadUserId` INTEGER NOT NULL,
    `uploadUserIP` VARCHAR(191) NOT NULL,
    `accessibleUser` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
