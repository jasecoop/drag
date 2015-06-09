class PagesController < ActionController::Base

  layout 'application'

  def home

    @tags = current_user.owned_tags

    if params[:tag]

      @images = current_user.images.tagged_with(params[:tag])

    else

      @images = current_user.images

    end
  end

end
