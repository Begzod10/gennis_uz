"""empty message

Revision ID: 6bfa31e702db
Revises: 17849345ef12
Create Date: 2022-07-06 21:16:04.855755

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6bfa31e702db'
down_revision = '17849345ef12'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('deletedteachersalaries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('payment_sum', sa.Integer(), nullable=True),
    sa.Column('reason', sa.String(), nullable=True),
    sa.Column('payment_type_id', sa.Integer(), nullable=True),
    sa.Column('salary_id', sa.Integer(), nullable=True),
    sa.Column('teacher_id', sa.Integer(), nullable=True),
    sa.Column('location_id', sa.Integer(), nullable=True),
    sa.Column('calendar_day', sa.Integer(), nullable=True),
    sa.Column('calendar_month', sa.Integer(), nullable=True),
    sa.Column('calendar_year', sa.Integer(), nullable=True),
    sa.Column('account_period_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['account_period_id'], ['accountingperiod.id'], ),
    sa.ForeignKeyConstraint(['calendar_day'], ['calendarday.id'], ),
    sa.ForeignKeyConstraint(['calendar_month'], ['calendarmonth.id'], ),
    sa.ForeignKeyConstraint(['calendar_year'], ['calendaryear.id'], ),
    sa.ForeignKeyConstraint(['location_id'], ['locations.id'], ),
    sa.ForeignKeyConstraint(['payment_type_id'], ['paymenttypes.id'], ),
    sa.ForeignKeyConstraint(['salary_id'], ['teachersalary.id'], ),
    sa.ForeignKeyConstraint(['teacher_id'], ['teachers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('deletedteachersalaries')
    # ### end Alembic commands ###