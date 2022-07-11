"""empty message

Revision ID: 4da88bca2227
Revises: 8b516eb37da7
Create Date: 2022-07-06 23:06:20.600155

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4da88bca2227'
down_revision = '8b516eb37da7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('deletedstaffsalaries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('payment_sum', sa.Integer(), nullable=True),
    sa.Column('reason', sa.String(), nullable=True),
    sa.Column('payment_type_id', sa.Integer(), nullable=True),
    sa.Column('salary_id', sa.Integer(), nullable=True),
    sa.Column('staff_id', sa.Integer(), nullable=True),
    sa.Column('location_id', sa.Integer(), nullable=True),
    sa.Column('calendar_day', sa.Integer(), nullable=True),
    sa.Column('calendar_month', sa.Integer(), nullable=True),
    sa.Column('calendar_year', sa.Integer(), nullable=True),
    sa.Column('profession_id', sa.Integer(), nullable=True),
    sa.Column('account_period_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['account_period_id'], ['accountingperiod.id'], ),
    sa.ForeignKeyConstraint(['calendar_day'], ['calendarday.id'], ),
    sa.ForeignKeyConstraint(['calendar_month'], ['calendarmonth.id'], ),
    sa.ForeignKeyConstraint(['calendar_year'], ['calendaryear.id'], ),
    sa.ForeignKeyConstraint(['location_id'], ['locations.id'], ),
    sa.ForeignKeyConstraint(['payment_type_id'], ['paymenttypes.id'], ),
    sa.ForeignKeyConstraint(['profession_id'], ['professions.id'], ),
    sa.ForeignKeyConstraint(['salary_id'], ['staffsalary.id'], ),
    sa.ForeignKeyConstraint(['staff_id'], ['staff.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('deletedstaffsalaries')
    # ### end Alembic commands ###