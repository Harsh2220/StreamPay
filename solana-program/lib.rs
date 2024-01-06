// program.rs

use anchor_lang::prelude::*;
use std::mem::size_of;

declare_id!("62NoqVk9TyThwDHghY6B4wmp4D2rqkfbrDn4jFnEy6XC");

#[program]
mod stream_pay {
    use super::*;

    pub fn initialize_user(
        ctx: Context<InitializeUser>,
        metadata_uri: String,
        is_company: bool,
    ) -> Result<()> {
        let user = &mut ctx.accounts.user;
        user.id = ctx.accounts.signer.key();
        user.is_company = is_company;
        user.metadata_uri = metadata_uri;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = signer,
        space = size_of::<InitializeUser>() + 16,
        seeds = ["id".as_bytes(),signer.key().as_ref()],
        bump
    )]
    pub user: Account<'info, User>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct User {
    pub id: Pubkey,
    pub signer: Pubkey,
    pub metadata_uri: String,
    pub is_company: bool,
}
