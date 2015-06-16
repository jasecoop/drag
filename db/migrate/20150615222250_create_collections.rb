class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.string :name
      t.string :setting_bg
      t.integer :setting_size
      t.boolean :setting_public

      t.timestamps null: false
    end
  end
end
