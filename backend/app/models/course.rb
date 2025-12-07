class Course < ApplicationRecord
  belongs_to :department

  has_many :course_offerings
  has_many :professors, through: :course_offerings
  has_many :reviews, through: :course_offerings

  validates :code, presence: true, uniqueness: true
  validates :title, presence: true
end
