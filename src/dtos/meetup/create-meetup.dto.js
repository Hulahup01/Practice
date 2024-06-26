class CreateMeetupDto {
    name;
    description;
    time;
    location;
    tags;

    constructor(data) {
        this.name = data?.name;
        this.description = data?.description;
        this.time = data?.time;
        this.location = data?.location;
        this.tags = data?.tags;
    }
}

module.exports = CreateMeetupDto