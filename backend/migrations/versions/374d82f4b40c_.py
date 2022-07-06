"""empty message

Revision ID: 374d82f4b40c
Revises: 5c801334e56b
Create Date: 2022-07-05 21:21:23.559937

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '374d82f4b40c'
down_revision = '5c801334e56b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('studentdiscount', sa.Column('attendance_history_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'studentdiscount', 'attendancehistorystudent', ['attendance_history_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'studentdiscount', type_='foreignkey')
    op.drop_column('studentdiscount', 'attendance_history_id')
    # ### end Alembic commands ###
