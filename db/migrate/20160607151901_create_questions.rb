class CreateQuestions < ActiveRecord::Migration[4.2]
  def change
    create_table :questions do |t|
      t.string :content, null: false
      t.boolean :multi_select, default: false, null: false

      t.timestamps null: false
    end
  end
end
