class Collection < ActiveRecord::Base
  belongs_to :user
  has_many :images

  accepts_nested_attributes_for :images, :reject_if => proc { |o| o['content'].blank? } #assuming Image has `content` field to hold the answer. Or replace with exact one.
end
