"""empty message

Revision ID: 40776c6d2bdc
Revises: 882763c5a5e0
Create Date: 2022-07-14 22:47:21.953244

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '40776c6d2bdc'
down_revision = '882763c5a5e0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('deletedstaffsalaries', sa.Column('hello', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('deletedstaffsalaries', 'hello')
    # ### end Alembic commands ###
