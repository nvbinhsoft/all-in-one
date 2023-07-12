import { Injectable } from "@nestjs/common";
import { CommandHandler } from "@nestjs/cqrs";
import { SignInCommand } from "./sign-in.command";

@CommandHandler(SignInCommand)
export class SignInService {}
