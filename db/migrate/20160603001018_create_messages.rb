class CreateMessages < ActiveRecord::Migration[4.2]
  def change
    create_table :messages do |t|
      t.integer :sender_id, null: false
      t.integer :receiver_id, null: false
      t.text :content, null: false

      t.timestamps null: false
    end

    add_index :messages, :sender_id
    add_index :messages, :receiver_id
  end
end
