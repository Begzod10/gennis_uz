"""empty message

Revision ID: 1fa56f1d8d7a
Revises: 6c58205d2453
Create Date: 2022-06-24 23:57:31.570010

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1fa56f1d8d7a'
down_revision = '6c58205d2453'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('capitalexpenditure',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('item_sum', sa.Integer(), nullable=True),
    sa.Column('item_name', sa.String(), nullable=True),
    sa.Column('payment_type_id', sa.Integer(), nullable=True),
    sa.Column('location_id', sa.Integer(), nullable=True),
    sa.Column('calendar_day', sa.Integer(), nullable=True),
    sa.Column('calendar_month', sa.Integer(), nullable=True),
    sa.Column('calendar_year', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['calendar_day'], ['calendarday.id'], ),
    sa.ForeignKeyConstraint(['calendar_month'], ['calendarmonth.id'], ),
    sa.ForeignKeyConstraint(['calendar_year'], ['calendaryear.id'], ),
    sa.ForeignKeyConstraint(['location_id'], ['locations.id'], ),
    sa.ForeignKeyConstraint(['payment_type_id'], ['paymenttypes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('capitalexpenditure')
    # ### end Alembic commands ###
