class TagsController < ActionController::Base

  # layout 'application'

  def index
    @tags = current_user.owned_tags
    render :json => @tags
  end

end
