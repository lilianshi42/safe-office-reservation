class Booking {
    constructor() {
        this.id = 0;
        this.address = "";
        this.floor = "";
        this.date = "";
        this.seat = "";
    }

    setFloor(id,address, floor, date) {
        this.id = id;
        this.address = address;
        this.floor = floor;
        this.date = date;
    }

    setSeat(seat) {
        this.seat = seat;
    }
}

export default Booking;