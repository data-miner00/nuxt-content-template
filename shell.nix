{
  # Pinned to nixos-26.05. To update: pick a new commit, then get its hash with
  #   nix-prefetch-url --unpack https://github.com/NixOS/nixpkgs/archive/<commit>.tar.gz
  pkgs ? import (fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/1bc55b9def8165e82073919945c3239903fe4dc2.tar.gz";
    sha256 = "1csnzj9gyjz25xbmmmqvgm8pbkn681by405wqm3xlzasxd0rlrhg";
  }) {},
  # Older nixpkgs where nodejs_20 is exactly 20.9.0 (commit found via nixhub.io).
  nodePkgs ? import (fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/a71323f68d4377d12c04a5410e214495ec598d4c.tar.gz";
    sha256 = "1n6233gn8b66x252k8hvk5xygn6rxj2prnls2mh0d2hb8hnhypx6";
  }) {},
}:

let
  projectName = "nuxt-content-template";
  nodejs = nodePkgs.nodejs_20;
  # pnpm 10 is the newest line that still supports Node 20 (pnpm 11 needs >=22.13);
  # pnpm 8/9 are EOL and flagged insecure in nixpkgs.
  pnpm = pkgs.pnpm_10.override { nodejs-slim = nodejs; };
in
pkgs.mkShellNoCC {
  name = "${projectName}-dev";

  packages = [
    nodejs
    pnpm
  ];

  shellHook = ''
    echo "Nix environment for ${projectName} is ready! (node $(node --version), pnpm $(pnpm --version))"
  '';
}
