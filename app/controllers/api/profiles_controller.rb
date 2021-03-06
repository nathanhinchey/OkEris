class Api::ProfilesController < ApplicationController
  wrap_parameters false

  def index
    unless current_user && current_user.profile
      render json: {}
    else
      profiles_info = paginated_profiles({
        page: params[:page].to_i,
        per: 4,
        min_age: params[:min_age],
        max_age: params[:max_age],
        motivation_id: params[:motivation_id],
        })
      @percentages = profiles_info[:match_percentages]
      @profiles = profiles_info[:profiles].sort {
        |p1,p2| @percentages[p2.id] <=> @percentages[p1.id]
      }
      @total_pages = profiles_info[:total_pages]
    end
  end

  def new
    @motivations = []
    Motivation.all.each do |motivation|
      @motivations << {body: motivation.body, id: motivation.id}
    end

    render :new
  end

  def show
    unless current_user && current_user.profile
      head :forbidden
    else
      @profile = Profile.find(params[:id])
      render :show
    end
  end

  def create
    user_id = Session
      .find_by(session_token: session[:session_token])
      .user_id

    @profile = Profile.new(profile_params)
    @profile.user_id = user_id
    if @profile.save
      render :show
    else
      render json: @profile.errors.full_messages, status: 422
    end
  end

  def update
    unless current_user.profile.id == params[:id].to_i
      head :forbidden
      return
    end

    @profile = Profile.find(params[:id])
    if @profile.update(profile_params)
      render :show
    else
      render json: @profile.errors.full_messages, status: 422
    end
  end

  private
    def profile_params
      params
        .require(:profile)
        .permit(:username, :birthday, :summary, :picture, :motivation_id)
    end

    def paginated_profiles(options)
      page = options[:page]
      page ||= 1

      per = options[:per]
      per ||= 5

      matches = current_user.profile.match_percentages(
        min_age: options[:min_age],
        max_age: options[:max_age],
        motivation_id: options[:motivation_id]
      )

      total = matches.count / per
      #build query
      start_idx = per * (page - 1)
      match_ids = []
      selected_matches = []
      per.times do |i|
        match = matches[start_idx + i]
        break if match.nil?
        #using string interpolation is safe here, since this is
        #all from back end values
        match_ids << "id = #{match[0]}"
        selected_matches << match
      end

      profiles = Profile.where(match_ids.join(" OR "))
      {
        profiles: profiles,
        total_pages: total,
        match_percentages: Hash[*selected_matches.flatten]
      }
    end
end




















# extra space
