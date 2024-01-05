// program.rs

use anchor_lang::prelude::*;

declare_id!("4gVJJfEuebrPBzsj1kaGEgXryFCgBT5ywQ9T44zrKXRV");

#[program]
mod stream_pay {
    use super::*;

    pub fn initialize_company(
        ctx: Context<InitializeCompany>,
        c_id: String,
        metadata_uri: String,
    ) -> Result<()> {
        let companies = &mut ctx.accounts.company;
        companies.c_id = c_id;
        companies.metadata_uri = metadata_uri;
        Ok(())
    }

    pub fn initialize_user(
        ctx: Context<InitializeUser>,
        u_id: String,
        metadata_uri: String,
    ) -> Result<()> {
        let user = &mut ctx.accounts.user;
        user.u_id = u_id;
        user.metadata_uri = metadata_uri;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(cid: String)]
pub struct InitializeCompany<'info> {
    #[account(
        init,
        payer = signer,
        space = 1000,
        seeds = ["cid".as_bytes(),cid.as_bytes()],
        bump
    )]
    pub company: Account<'info, Company>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(uid: String)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = signer,
        space = 1000,
        seeds = ["uid".as_bytes(),uid.as_bytes()],
        bump
    )]
    pub user: Account<'info, User>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Company {
    pub c_id: String,
    pub metadata_uri: String,
    pub bump: u8,
}

#[account]
pub struct User {
    pub u_id: String,
    pub metadata_uri: String,
    pub bump: u8,
}
