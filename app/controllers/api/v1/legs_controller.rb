class Api::V1::LegsController < ApplicationController
  def index
    render json: Leg.all
  end

  def leg_params
    params.require(:leg).permit(:id, :start_stop, :end_stop, :speed_limit, :leg_ID)
  end
end
