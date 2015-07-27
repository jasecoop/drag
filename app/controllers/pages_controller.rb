class PagesController < ActionController::Base

  layout 'application'

  def home

  end

  def update_user
    @user = current_user
    colour = params[:setting_bg]
    @user.setting_bg = colour
    @user.save
    respond_to do |format|
      format.json { render :nothing => true, status: 200 }
    end
  end

  def update_user_size
    @user = current_user
    size = params[:setting_size]
    @user.setting_size = size
    @user.save
    respond_to do |format|
      format.json { render :nothing => true, status: 200 }
    end
  end

end
