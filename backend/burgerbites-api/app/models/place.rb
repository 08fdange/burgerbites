class Place < ApplicationRecord
    has_many :ratings
    has_many :reviews
    has_many users, through: :ratings
    has_many users, through: :reviews
end
