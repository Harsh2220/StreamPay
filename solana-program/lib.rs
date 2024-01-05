// program.rs

use anchor_lang::prelude::*;
use std::mem::size_of;

declare_id!("HJQBiUzcGgR7eZnQpYwpxgarH9yy6vDHtZW8gCExyPzU");

#[program]
mod stream_pay {
    use super::*;

    pub fn initialize_user(
        ctx: Context<InitializeUser>,
        id: String,
        metadata_uri: String,
        is_company: bool,
    ) -> Result<()> {
        let user = &mut ctx.accounts.user;
        user.id = id;
        user.is_company = is_company;
        user.metadata_uri = metadata_uri;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(id: String)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = signer,
        space = size_of::<InitializeUser>() + 16,
        seeds = ["id".as_bytes(),id.as_bytes()],
        bump
    )]
    pub user: Account<'info, User>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
#[account]
pub struct User {
    pub id: String,
    pub metadata_uri: String,
    pub is_company: bool,
}
