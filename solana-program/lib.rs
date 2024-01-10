use anchor_lang::prelude::*;
use std::mem::size_of;
declare_id!("EimuHrWeLuL95txBNkXbNTB43A9EWwGDqcB4ndMECynM");

#[program]
mod stream_pay {
    use super::*;

    //Create Functions
    pub fn initialize_company(ctx: Context<InitializeCompamy>, metadata_uri: String) -> Result<()> {
        let companies = &mut ctx.accounts.company;
        companies.c_id = ctx.accounts.signer.key();
        companies.metadata_uri = metadata_uri;
        companies.all_employees = [].to_vec();
        Ok(())
    }

    pub fn initialize_user(ctx: Context<InitializeUser>, metadata_uri: String) -> Result<()> {
        let user = &mut ctx.accounts.user;
        user.u_id = ctx.accounts.signer.key();
        user.metadata_uri = metadata_uri;
        Ok(())
    }

    //Update Functions
    pub fn update_user_details(
        ctx: Context<UpdateUserDetails>,
        new_metadata_uri: String,
    ) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        user_account.metadata_uri = new_metadata_uri;
        Ok(())
    }

    pub fn update_company_details(
        ctx: Context<UpdateCompanyDetails>,
        new_metadata_uri: String,
    ) -> Result<()> {
        let company_account = &mut ctx.accounts.company_account;
        company_account.metadata_uri = new_metadata_uri;
        Ok(())
    }

    //Add a new Employee to Company
    pub fn add_company_employee(
        ctx: Context<AddCompanyEmployee>,
        new_employee_key: Pubkey,
    ) -> Result<()> {
        let company_account = &mut ctx.accounts.company_account;
        if company_account.all_employees.contains(&new_employee_key) {
            return Err(SPErrors::AlreadyEmployeeOfTheCompany.into());
        }
        company_account.all_employees.push(new_employee_key);
        Ok(())
    }

    //Remove a Employee
    pub fn remove_company_employee(
        ctx: Context<RemoveCompanyEmployee>,
        employee_key_to_remove: Pubkey,
    ) -> Result<()> {
        let company_account = &mut ctx.accounts.company_account;
        let employee_index = company_account
            .all_employees
            .iter()
            .position(|&key| key == employee_key_to_remove);

        match employee_index {
            Some(index) => {
                company_account.all_employees.remove(index);
                Ok(())
            }
            None => Err(SPErrors::EmployeeNotFound.into()),
        }
    }

    //Delete Company Account
    pub fn delete_compnay_account(ctx: Context<DeleteCompanyAccount>) -> Result<()> {
        Ok(())
    }

    //Delete Company Account
    pub fn delete_user_account(ctx: Context<DeleteUserAccount>) -> Result<()> {
        Ok(())
    }

}

#[derive(Accounts)]
pub struct InitializeCompamy<'info> {
    #[account(
    init, 
    seeds = ["c_id".as_bytes(), signer.key().as_ref()],
    payer = signer,
    space = size_of::<InitializeCompamy>(),
    bump)]
    pub company: Account<'info, Company>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
    init, 
    seeds = ["u_id".as_bytes(), signer.key().as_ref()],
    payer = signer,
    space = size_of::<InitializeUser>(),
    bump,
   )]
    pub user: Account<'info, User>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateUserDetails<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
    mut,
    seeds = ["u_id".as_bytes(), signer.key().as_ref()],
    bump
    )]
    pub user_account: Account<'info, User>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateCompanyDetails<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
    mut,
    seeds = ["c_id".as_bytes(), signer.key().as_ref()],
    bump
    )]
    pub company_account: Account<'info, Company>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddCompanyEmployee<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
    mut,
    seeds = ["c_id".as_bytes(), signer.key().as_ref()],
    bump
    )]
    pub company_account: Account<'info, Company>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RemoveCompanyEmployee<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
    mut,
    seeds = ["c_id".as_bytes(), signer.key().as_ref()],
    bump
    )]
    pub company_account: Account<'info, Company>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeleteCompanyAccount<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
    mut,
    close=signer,
    seeds = ["c_id".as_bytes(), signer.key().as_ref()],
    bump
    )]
    pub company_account: Account<'info, Company>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeleteUserAccount<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
    mut,
    close=signer,
    seeds = ["u_id".as_bytes(), signer.key().as_ref()],
    bump
    )]
    pub user_account: Account<'info, User>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Company {
    c_id: Pubkey,
    signer: Pubkey,
    metadata_uri: String,
    all_employees: Vec<Pubkey>,
}

#[account]
pub struct User {
    u_id: Pubkey,
    signer: Pubkey,
    metadata_uri: String,
}

#[error_code]
pub enum SPErrors {
    #[msg("Already Part of the company")]
    AlreadyEmployeeOfTheCompany,
    #[msg("No Employee FOund with the Error")]
    EmployeeNotFound,
}
