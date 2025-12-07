class Professor < ApplicationRecord
  has_many :course_offerings
  has_many :courses, through: :course_offerings
  has_many :reviews, through: :course_offerings

  validates :name, presence: true
end

