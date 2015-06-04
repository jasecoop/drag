class ImagesController < ApplicationController
  before_action :set_image, only: [:show, :edit, :update, :destroy]

  # GET /images
  # GET /images.json
  def index

    @user = current_user

    @presenter = {
      :user => @user
    }

    @tags = current_user.owned_tags
    # @tags_presenter = render json: @tags

    if params[:tag]

      # @articles = Article.tagged_with(params[:tag])

      @images = current_user.images.tagged_with(params[:tag])
      # @presenter = {
      #   :images => current_user.images.tagged_with(params[:tag])
      # }

    else

      @images = current_user.images
      # @presenter = {
      #   :images => current_user.images
      # }

    end
  end

  def user_tags
    @tags = current_user.owned_tags
    render json: @tags
  end

  # GET /images/1
  # GET /images/1.json
  def show
  end

  # GET /images/new
  def new
    @image = Image.new
  end

  # GET /images/1/edit
  def edit
  end

  # POST /images
  # POST /images.json
  def create
    @image = Image.new(file: params[:file])
    @image.user_id = current_user.id if current_user

    if @image.save!
      respond_to do |format|
        format.json{ render :json => @image }
      end
    end
  end

  # PATCH/PUT /images/1
  # PATCH/PUT /images/1.json
  def update
    @image = Image.find_by_id(params[:id])
    @image.update(image_params)
    if @image.update_attributes(params[:image])

      respond_to do |format|
        format.html {
                    flash[:success] = "success"
                    redirect_to image_path
        }
        format.js
      end
    else
      respond_to do |format|
        format.html {
                    flash[:error] = @image.errors.present? ? @image.errors.full_messages.join('<br />') : "Oops! There is some problem with category update."
                    render :edit
        }
        format.js
      end
    end
  end

  # DELETE /images/1
  # DELETE /images/1.json
  def destroy
    @image.destroy
    respond_to do |format|
      format.html { redirect_to images_url, notice: 'Image was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def edit_upload
    @user  = current_user
    @image = Image.find(params[:id])
    tl = params[:tag_list]
    # @image.update_attributes(image_params)
    # @image.tag_list = tl
    @user.tag(@image, :with => tl, :on => :tags)

    @image.save

    # if @image.update_attributes(params[:image])
    respond_to do |format|
      format.js
      format.html { render :nothing => true, :notice => 'Update SUCCESSFUL!' }
      format.json { render json: @image, status: :created, location: @image }
    end
    # else
    #   respond_to do |format|
    #     format.html {
    #                 flash[:error] = @image.errors.present? ? @image.errors.full_messages.join('<br />') : "Oops! There is some problem with category update."
    #                 render :edit
    #     }
    #     format.js
    #   end
    # end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def image_params
      params.require(:image).permit(:file, :tag_list => [])
    end
end
