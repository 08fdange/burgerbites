class User < ApplicationRecord
    has_many :ratings
    has_many :reviews
    has_many places, through: :ratings
    has_many places, through: :reviews
end
