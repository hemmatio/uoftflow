class CreateCourseOfferings < ActiveRecord::Migration[8.0]
  def change
    create_table :course_offerings do |t|
      t.string :term
      t.references :course, null: false, foreign_key: true
      t.references :professor, null: false, foreign_key: true

      t.timestamps
    end

    add_index :course_offerings, [:course_id, :professor_id, :term], unique: true, name: 'index_course_offerings_on_course_professor_term'
  end
end
