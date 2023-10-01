import { AuthEffect } from "../../modules/auth/state/auth/auth.effect";
import { FileEffect } from "../../modules/auth/state/file/file.effect";
import { SignUpEffect } from "../../modules/auth/state/signup/signup.effect";
import { ContactEffect } from "../../pages/contact/state/contact.effect";

export const appEffects = [
  AuthEffect,
  ContactEffect,
  FileEffect,
  SignUpEffect
]
