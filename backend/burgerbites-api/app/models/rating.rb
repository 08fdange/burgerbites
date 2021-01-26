class Rating < ApplicationRecord
  belongs_to :user

  # #validations
  # validates :uniqueness_of_user_and_place

  # def uniqueness_of_user_and_place
  #   if !(User.exists? id: self.user_id)
  #     validates 
  # end
end