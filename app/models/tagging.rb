class Tagging < ActiveRecord::Base
  belongs_to :images
  belongs_to :tag
end
