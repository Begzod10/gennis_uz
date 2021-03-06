"""empty message

Revision ID: 882763c5a5e0
Revises: 94fb059bb9b5
Create Date: 2022-07-11 00:39:33.506044

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '882763c5a5e0'
down_revision = '94fb059bb9b5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('teachersalarygroup',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('payment_sum', sa.Integer(), nullable=True),
    sa.Column('reason', sa.String(), nullable=True),
    sa.Column('payment_type_id', sa.Integer(), nullable=True),
    sa.Column('salary_location_id', sa.Integer(), nullable=True),
    sa.Column('teacher_id', sa.Integer(), nullable=True),
    sa.Column('location_id', sa.Integer(), nullable=True),
    sa.Column('calendar_day', sa.Integer(), nullable=True),
    sa.Column('calendar_month', sa.Integer(), nullable=True),
    sa.Column('calendar_year', sa.Integer(), nullable=True),
    sa.Column('account_period_id', sa.Integer(), nullable=True),
    sa.Column('group_id', sa.Integer(), nullable=True),
    sa.Column('attendance_history', sa.Integer(), nullable=True),
    sa.Column('main_salary_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['account_period_id'], ['accountingperiod.id'], ),
    sa.ForeignKeyConstraint(['attendance_history'], ['attendancehistoryteacher.id'], ),
    sa.ForeignKeyConstraint(['calendar_day'], ['calendarday.id'], ),
    sa.ForeignKeyConstraint(['calendar_month'], ['calendarmonth.id'], ),
    sa.ForeignKeyConstraint(['calendar_year'], ['calendaryear.id'], ),
    sa.ForeignKeyConstraint(['group_id'], ['groups.id'], ),
    sa.ForeignKeyConstraint(['location_id'], ['locations.id'], ),
    sa.ForeignKeyConstraint(['main_salary_id'], ['teachersalaries.id'], ),
    sa.ForeignKeyConstraint(['payment_type_id'], ['paymenttypes.id'], ),
    sa.ForeignKeyConstraint(['salary_location_id'], ['teachersalary.id'], ),
    sa.ForeignKeyConstraint(['teacher_id'], ['teachers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('teachersalarygroup')
    # ### end Alembic commands ###
