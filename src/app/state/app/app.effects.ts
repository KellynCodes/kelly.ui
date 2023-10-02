import { AuthEffect } from "../../modules/auth/state/auth/auth.effect";
import { SignUpEffect } from "../../modules/auth/state/signup/signup.effect";
import { ContactEffect } from "../../pages/contact/state/contact.effect";
import { FileEffect } from "../file/file.effect";

export const appEffects = [
  AuthEffect,
  ContactEffect,
  FileEffect,
  SignUpEffect
]
