/// <reference path="../.astro/db-types.d.ts" />
/// <reference types="astro/client" />
/// <reference path="../.astro/actions.d.ts" />
interface User {
  name: string;
  email: string;
  //todo: otros items
}

declare namespace App {
  interface Locals {
    isLoggedIn: boolean;
    isAdmin: boolean;
    user: User | null;
  }
}
