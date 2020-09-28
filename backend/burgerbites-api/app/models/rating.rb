class Rating < ApplicationRecord
  belongs_to :user

  #validations
  validates :user.place, uniqueness: true
end
