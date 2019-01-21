class Api::V1::StopsController < ApplicationController
  def index
    render json:Stop.all
  end

  def driver
    render json: Driver.first
  end

  def update_driver
    @driver = Driver.first
    @driver.update_attributes(active_leg_id: params[:selectedLeg], leg_progress: params[:progress])
    render json: @driver
  end

  def bonus_driver
    render json: BonusDriver.first
  end

  def update_bonus_driver
    @bonus_driver = BonusDriver.first
    @bonus_driver.update_attributes(x_coordinate: params[:x], y_coordinate: params[:y])
    render json: @bonus_driver
  end

  def stop_params
    params.require(:stop).permit(:id, :name, :x_coordinate, :y_coordinate)
  end
end
