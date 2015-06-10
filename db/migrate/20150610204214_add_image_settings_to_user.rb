class AddImageSettingsToUser < ActiveRecord::Migration
  def change
    add_column :users, :setting_bg, :string
    add_column :users, :setting_size, :integer
  end
end
