class AddCollectionIdToImages < ActiveRecord::Migration
  def change
    add_column :images, :collection_id, :integer
  end
end
