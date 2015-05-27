class AddImageIdToTaggings < ActiveRecord::Migration
  def change
    add_column :taggings, :image_id, :integer
  end
end
