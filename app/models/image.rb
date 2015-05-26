class Image < ActiveRecord::Base
  mount_uploader :file, FileUploader
  acts_as_taggable
  belongs_to :user
end
