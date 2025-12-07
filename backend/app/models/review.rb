class Review < ApplicationRecord
  belongs_to :course_offering

  validates :rating, presence: true, inclusion: { in: 1..5 }
end

