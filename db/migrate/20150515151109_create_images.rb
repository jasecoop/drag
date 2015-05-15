class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :url
      t.string :source
      t.string :title
      t.string :desc

      t.timestamps null: false
    end
  end
end
