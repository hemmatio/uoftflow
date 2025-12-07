class CreateProfessors < ActiveRecord::Migration[8.0]
  def change
    create_table :professors do |t|
      t.string :name

      t.timestamps
    end

    add_index :professors, :name
  end
end

