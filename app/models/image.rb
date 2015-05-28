class Image < ActiveRecord::Base
  mount_uploader :file, FileUploader
  belongs_to :user
  acts_as_taggable_on :tags

end
