{ pkgs }: {
    deps = [
        pkgs.mongodb-3_4
        pkgs.sudo
        pkgs.nodejs-16_x
        pkgs.cowsay
    ];
}