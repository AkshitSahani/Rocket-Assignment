require 'test_helper'

class StopsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get stops_index_url
    assert_response :success
  end

end
