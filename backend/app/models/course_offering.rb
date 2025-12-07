class CourseOffering < ApplicationRecord
  belongs_to :course
  belongs_to :professor

  has_many :reviews
end
